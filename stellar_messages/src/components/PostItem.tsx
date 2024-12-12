import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import dayjs from 'dayjs';

interface PostItemProps {
  id: number;
  title: string;
  tags: string[];
  likes: number;
  createdAt: string;
  author: {
    id: number;
    username: string;
  };
  currentUserId: number;
  onLike: (id: number) => void;
  onDelete: (id: number) => void;
  isAuthor: boolean;
}

const PostItem: React.FC<PostItemProps> = ({
  id,
  title,
  tags = [],
  likes = 0,
  createdAt,
  author,
  currentUserId,
  onLike,
  onDelete,
  isAuthor,
}) => {
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(likes);

  useEffect(() => {
    setLikeCount(likes);
  }, [likes]);

  const handleLikeToggle = async () => {
    if (onLike) {
      const newIsLiked = !isLiked;
      setIsLiked(newIsLiked);
      try {
        await onLike(id);
      } catch (error) {
        setIsLiked(!newIsLiked);
        console.error('Failed to update like:', error);
      }
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.authorText}>
          {author.id === currentUserId ? 'You' : `@${author.username}`}
        </Text>
        <View style={styles.headerRight}>
          <Text style={styles.dateText}>{dayjs(createdAt).fromNow()}</Text>
        </View>
      </View>

      <Text style={styles.title}>{title}</Text>

      {tags.length > 0 && (
        <View style={styles.tagRow}>
          {tags.map((tag, index) => (
            <View style={styles.tag} key={`${tag}-${index}`}>
              <Text style={styles.tagText}>{tag}</Text>
            </View>
          ))}
        </View>
      )}

      <View style={styles.metaRow}>
        <TouchableOpacity
          onPress={handleLikeToggle}
          style={styles.likeContainer}>
          <Text style={[styles.heartIcon, isLiked && styles.heartIconLiked]}>
            ♥
          </Text>
          <Text style={styles.likeCount}>{likeCount}</Text>
        </TouchableOpacity>
        {isAuthor && (
          <TouchableOpacity
            onPress={() => onDelete(id)}
            style={styles.deleteButton}>
            <Text style={styles.deleteIcon}>🗑️</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#33394F',
    borderRadius: 8,
    padding: 16,
    marginBottom: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  authorText: {
    color: '#FF6934',
    fontSize: 14,
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  dateText: {
    color: '#8E8E93',
    fontSize: 12,
  },
  title: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 10,
  },
  tagRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 10,
  },
  tag: {
    backgroundColor: '#2B2F3A',
    borderRadius: 8,
    paddingVertical: 4,
    paddingHorizontal: 8,
    marginRight: 8,
    marginBottom: 8,
  },
  tagText: {
    color: '#FFFFFF',
    fontSize: 12,
  },
  metaRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  likeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  heartIcon: {
    color: '#FFFFFF',
    fontSize: 16,
  },
  heartIconLiked: {
    color: '#FF6934',
  },
  likeCount: {
    color: '#FFFFFF',
    fontSize: 14,
  },
  deleteButton: {
    padding: 4,
  },
  deleteIcon: {
    fontSize: 16,
    color: '#FF4444',
  },
});

export default PostItem;
