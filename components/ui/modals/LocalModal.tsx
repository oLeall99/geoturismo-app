import { Local } from '@/services/api/local';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import React, { useState } from 'react';
import {
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { ActivityIndicator, Card, Modal, Portal } from 'react-native-paper';

interface LocalModalProps {
  visible: boolean;
  loading: boolean;
  local: Local | null;
  onClose: () => void;
}

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;
const MODAL_HEIGHT = SCREEN_HEIGHT * 0.75;

export default function LocalModal({ visible, loading, local, onClose}: LocalModalProps) {
  const [index, setIndex] = useState(0);

  if (!local) return null;

  //const categories = local.categories || [];
  const itemsPerPage = 3;

  // Infinite carousel logic
  const handleNext = () => {
    //setIndex((prev) => (prev + itemsPerPage) % categories.length);
  };

  const handlePrev = () => {
    //setIndex((prev) => (prev - itemsPerPage + categories.length) % categories.length);
  };

  const getDisplayedCategories = (start: number) => {
    const end = start + itemsPerPage;
    //if (end <= categories.length) return categories.slice(start, end);
    //return [...categories.slice(start), ...categories.slice(0, end - categories.length)];
  };

  const displayedCategories = getDisplayedCategories(index);

  return (
    <Portal>
      <Modal visible={visible} onDismiss={onClose} contentContainerStyle={styles.modalContainer}>
        <TouchableOpacity style={styles.buttonExit} onPress={onClose}>
          <MaterialCommunityIcons name="close" size={26} color="black" />
        </TouchableOpacity>

        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.keyboardView}
        >
          <Card style={styles.card} elevation={5}>
            <Card.Content style={styles.cardContent}>
              {loading ? (
                <ActivityIndicator size="large" color="#0077B6" />
              ) : (

                <ScrollView
                showsVerticalScrollIndicator={false}
                keyboardShouldPersistTaps="handled"
                contentContainerStyle={styles.scrollContent}
                >
                  {/* Buttons */}
                  <View style={styles.buttonsContainer}>
                    <TouchableOpacity style={styles.infoButton}>
                      <Text style={styles.buttonTextInfo}>Informações</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.reviewsButton}>
                      <Text style={styles.buttonText}>Avaliações</Text>
                    </TouchableOpacity>
                  </View>

                  {/* Local title */}
                  <Text style={styles.localTitle}>{local.nome}</Text>

                  {/* Categories carousel */}
                  { /*categories.length > 0 && (
                    <View style={styles.carouselContainer}>
                    <TouchableOpacity onPress={handlePrev} style={styles.arrowButton}>
                    <MaterialCommunityIcons name="chevron-left" size={26} color="#2B2D42" />
                    </TouchableOpacity>
                  
                    <FlatList
                    data={displayedCategories}
                    keyExtractor={(item) => item.id}
                    horizontal
                    scrollEnabled={false}
                    renderItem={({ item }) => (
                      <View style={[styles.categoryBadge, { backgroundColor: item.color }]}>
                      <Text style={styles.categoryText}>{item.label}</Text>
                      </View>
                      )}
                      contentContainerStyle={styles.categoriesContainer}
                      />
                    
                      <TouchableOpacity onPress={handleNext} style={styles.arrowButton}>
                      <MaterialCommunityIcons name="chevron-right" size={26} color="#2B2D42" />
                      </TouchableOpacity>
                      </View>
                      XX)*/}

                  {/* Local description */}
                  <Text style={styles.localDescription}>{local.descricao}</Text>
                </ScrollView>
              )}
            </Card.Content>
          </Card>
        </KeyboardAvoidingView>
      </Modal>
    </Portal>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    margin: 0,
  },
  keyboardView: {
    width: '100%',
  },
  card: {
    width: '100%',
    height: MODAL_HEIGHT,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    backgroundColor: 'white',
    margin: 0,
  },
  cardContent: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 20,
  },
  scrollContent: {
    gap: 16,
    paddingBottom: 20,
    alignItems: 'center',
  },
  localTitle: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#2B2D42',
    marginBottom: 6,
  },
  localDescription: {
    fontSize: 16,
    color: '#2B2D42',
    marginBottom: 12,
    textAlign: 'justify',
  },
  carouselContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
    width: '100%',
  },
  arrowButton: {
    paddingHorizontal: 6,
  },
  categoriesContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
  },
  categoryBadge: {
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 5,
    minWidth: (SCREEN_WIDTH - 150) / 3,
    alignItems: 'center',
  },
  categoryText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 13,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    gap: 20,
    marginBottom: 20,
  },
  infoButton: {
    backgroundColor: '#90E0EF',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 37,
  },
  reviewsButton: {
    backgroundColor: '#999999',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 37,
  },
  buttonText: {
    color: 'white',
    fontSize: 17,
    fontWeight: '600',
  },
  buttonTextInfo: {
    color: 'black',
    fontSize: 17,
    fontWeight: '600',
  },
  buttonExit: {
    position: 'absolute',
    top: 15,
    right: 15,
    zIndex: 10,
  },
});
