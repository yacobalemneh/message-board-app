import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import updateLocale from 'dayjs/plugin/updateLocale';
import React, {useState, useContext, useEffect, useCallback} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
  ActivityIndicator,
  StyleSheet,
  Animated,
} from 'react-native';
import debounce from 'lodash/debounce';
import FilterTabs from '../components/FilterTabs';
import PostItem from '../../../components/PostItem';
import BottomSheet from '../../../components/BottomSheet';
import CategoryChips from '../../../components/CategoryChips';
import {AuthContext} from '../../../state/AuthContext';
import {postsApi} from '../../../services/api';
import {Post} from '../../../navigation/types';

dayjs.extend(relativeTime);
dayjs.extend(updateLocale);

dayjs.updateLocale('en', {
  relativeTime: {
    future: 'in %s',
    past: '%s ago',
    s: 'now',
    m: '1m',
    mm: '%dm',
    h: '1h',
    hh: '%dh',
    d: '1d',
    dd: '%dd',
    M: '1mo',
    MM: '%dmo',
    y: '1y',
    yy: '%dy',
  },
});

const MessageBoardScreen = () => {
  const {user, logout} = useContext(AuthContext);
  const [selectedFilter, setSelectedFilter] = useState<'newest' | 'popular'>(
    'newest',
  );
  const [bottomSheetVisible, setBottomSheetVisible] = useState(false);
  const [postContent, setPostContent] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [page, setPage] = useState(1);
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [, setError] = useState('');
  const [fetchError, setFetchError] = useState('');

  const [hasMore, setHasMore] = useState(true);
  const [chipsAnimation] = useState(new Animated.Value(0));

  const categories = [
    'finance',
    'politics',
    'tech',
    'lifestyle',
    'fashion',
    'sports',
    'music',
    'food',
  ];

  const fetchPosts = useCallback(
    async (p: number) => {
      if (p === 1) {
        setIsLoading(true);
      } else {
        setIsLoadingMore(true);
      }

      try {
        const {posts: newPosts, hasMore: hasNextPage} = await postsApi.getPosts(
          p,
          selectedFilter,
        );

        const normalizedPosts = newPosts.map(post => ({
          ...post,
          tags: Array.isArray(post.tags)
            ? post.tags
            : post.tags
            ? [post.tags]
            : [],
        }));

        setPosts(prev =>
          p === 1 ? normalizedPosts : [...prev, ...normalizedPosts],
        );
        setHasMore(hasNextPage);
        setFetchError('');
      } catch (err) {
        setFetchError('Failed to load posts');
        console.error('Fetch posts error:', err);
      } finally {
        setIsLoading(false);
        setIsLoadingMore(false);
      }
    },
    [selectedFilter],
  );

  const handleLoadMore = () => {
    debounce(() => {
      if (!isLoadingMore && hasMore) {
        const nextPage = page + 1;
        setPage(nextPage);
        fetchPosts(nextPage);
      }
    }, 300)();
  };

  useEffect(() => {
    fetchPosts(1);
  }, [fetchPosts, selectedFilter]);

  // Animate the CategoryChips based on postContent
  useEffect(() => {
    if (postContent.trim().length > 0) {
      Animated.timing(chipsAnimation, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(chipsAnimation, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }).start();
    }
  }, [postContent, chipsAnimation]);

  const handleCreatePost = async () => {
    if (!postContent.trim()) {
      return;
    }

    setIsLoading(true);
    setError('');
    try {
      const newPost = await postsApi.createPost(
        postContent,
        selectedCategories,
      );

      const normalizedPost = {
        ...newPost,
        tags: Array.isArray(newPost.tags)
          ? newPost.tags
          : newPost.tags
          ? [newPost.tags]
          : [],
      };

      setPosts([normalizedPost, ...posts]);
      setPostContent('');
      setSelectedCategories([]);
    } catch (err) {
      setError('Failed to create post');
      console.error('Error creating post:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeletePost = useCallback(async (postId: number) => {
    try {
      await postsApi.deletePost(postId);
      setPosts(prev => prev.filter(p => p.id !== postId));
    } catch (err) {
      console.error('Error deleting post:', err);
      setError('Failed to delete post');
    }
  }, []);

  const handleLikePost = useCallback(
    async (postId: number) => {
      try {
        const post = posts.find(p => p.id === postId);
        if (!post) {
          return;
        }

        const isCurrentlyLiked = post.isLiked ?? false;

        setPosts(prev =>
          prev.map(p =>
            p.id === postId
              ? {
                  ...p,
                  isLiked: !isCurrentlyLiked,
                  likes: isCurrentlyLiked ? p.likes - 1 : p.likes + 1,
                }
              : p,
          ),
        );

        const updatedPost = await postsApi.likePost(postId, isCurrentlyLiked);

        const normalizedPost = {
          ...updatedPost,
          tags: Array.isArray(updatedPost.tags)
            ? updatedPost.tags
            : updatedPost.tags
            ? [updatedPost.tags]
            : [],
          isLiked: !isCurrentlyLiked,
        };

        setPosts(prev => prev.map(p => (p.id === postId ? normalizedPost : p)));
      } catch (err) {
        console.error('Error toggling like:', err);
        setError('Failed to toggle like');
      }
    },
    [posts],
  );

  const handleToggleCategory = (cat: string) => {
    setSelectedCategories(prev =>
      prev.includes(cat) ? prev.filter(c => c !== cat) : [...prev, cat],
    );
  };

  if (isLoading && posts.length === 0) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#FF6934" />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <BottomSheet
        visible={bottomSheetVisible}
        onClose={() => setBottomSheetVisible(false)}
        userEmail={user?.email || 'No Email'}
        username={user?.username || 'Unknown'}
        onAboutPress={() => console.log('About pressed')}
        onLogoutPress={logout}
      />
      <View style={styles.container}>
        <View style={styles.headerRow}>
          <TouchableOpacity
            onPress={() => setBottomSheetVisible(true)}
            style={styles.avatarContainer}>
            <Text style={styles.avatarText}>
              {user?.username?.[0]?.toUpperCase() || 'U'}
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.createRow}>
          <TextInput
            style={styles.postInput}
            placeholder="What's on your mind?"
            placeholderTextColor="#d5d6de"
            value={postContent}
            onChangeText={setPostContent}
            multiline
            maxLength={280}
          />
          <TouchableOpacity
            style={[
              styles.createButton,
              (!postContent.trim() || isLoading) && styles.createButtonDisabled,
            ]}
            onPress={handleCreatePost}
            disabled={!postContent.trim() || isLoading}>
            {isLoading ? (
              <ActivityIndicator color="#FFFFFF" />
            ) : (
              <Text style={styles.createButtonText}>Post</Text>
            )}
          </TouchableOpacity>
        </View>

        <Animated.View
          style={{
            opacity: chipsAnimation,
            transform: [
              {
                translateY: chipsAnimation.interpolate({
                  inputRange: [0, 1],
                  outputRange: [-10, 0],
                }),
              },
            ],
          }}>
          <CategoryChips
            categories={categories}
            selectedCategories={selectedCategories}
            onToggleCategory={handleToggleCategory}
          />
        </Animated.View>

        <View style={styles.filterTabsContainer}>
          <FilterTabs selected={selectedFilter} onSelect={setSelectedFilter} />
        </View>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={posts}
          keyExtractor={item => item.id.toString()}
          renderItem={({item}) => (
            <PostItem
              id={item.id}
              title={item.content}
              tags={item.tags}
              likes={item.likes}
              createdAt={dayjs(item.created_at).fromNow()}
              author={item.author || {id: 0, username: 'Unknown'}}
              currentUserId={user?.id ?? 0}
              onLike={() => handleLikePost(item.id)}
              isAuthor={item.author?.id === user?.id}
              onDelete={handleDeletePost}
            />
          )}
          onEndReached={handleLoadMore}
          onEndReachedThreshold={0.5}
          ListFooterComponent={
            isLoadingMore ? (
              <ActivityIndicator size="large" color="#FF6934" />
            ) : null
          }
        />

        {fetchError ? (
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>{fetchError}</Text>
            <TouchableOpacity
              onPress={() => fetchPosts(1)}
              style={styles.retryButton}>
              <Text style={styles.retryButtonText}>Retry</Text>
            </TouchableOpacity>
          </View>
        ) : null}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#202433',
  },
  container: {
    flex: 1,
    paddingHorizontal: 30,
    paddingTop: 5,
    paddingBottom: 40,
  },
  chipsContainer: {
    marginBottom: 16,
  },
  filterTabsContainer: {
    marginTop: 16,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginBottom: 24,
  },
  avatarContainer: {
    width: 40,
    height: 40,
    backgroundColor: '#FF6934',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 18,
  },
  createRow: {
    flexDirection: 'row',
    marginBottom: 12,
    alignItems: 'center',
  },
  postInput: {
    flex: 1,
    backgroundColor: '#33394F',
    borderRadius: 8,
    color: '#FFFFFF',
    padding: 14,
    marginRight: 10,
    fontSize: 16,
    minHeight: 45,
  },
  createButton: {
    backgroundColor: '#FF6934',
    borderRadius: 8,
    paddingVertical: 14,
    paddingHorizontal: 16,
    minWidth: 80,
    alignItems: 'center',
  },
  createButtonDisabled: {
    opacity: 0.7,
  },
  createButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '500',
  },
  selectedCategoriesText: {
    color: '#FFFFFF',
    marginBottom: 8,
    fontSize: 14,
  },
  errorText: {
    color: '#FF4444',
    marginVertical: 8,
    fontSize: 14,
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 50,
  },
  emptyText: {
    fontSize: 18,
    color: '#FFFFFF',
  },
  errorContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  retryButton: {
    marginTop: 10,
    backgroundColor: '#FF6934',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  retryButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
  },
});

export default MessageBoardScreen;
