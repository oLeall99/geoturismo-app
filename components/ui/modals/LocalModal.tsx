import { LocalUnique } from '@/services/api/local';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import React, { useState } from 'react';
import {
  Dimensions,
  FlatList,
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
  local: LocalUnique | null;
  onClose: () => void;
}

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;
const MODAL_HEIGHT = SCREEN_HEIGHT * 0.75;

export default function LocalModal({ visible, loading, local, onClose }: LocalModalProps) {
  const [index, setIndex] = useState(0);

  if (!visible) return null; // evita renderização desnecessária
  if (!local) return null;

  const categories: string[] = local.categorias || [];
  const itemsPerPage = 3;

  const handleNext = () => {
    if (categories.length === 0) return;
    setIndex((prev) => (prev + itemsPerPage) % categories.length);
  };

  const handlePrev = () => {
    if (categories.length === 0) return;
    setIndex((prev) => (prev - itemsPerPage + categories.length) % categories.length);
  };

  const getDisplayedCategories = (start: number) => {
    if (categories.length === 0) return [];
    const end = start + itemsPerPage;
    if (end <= categories.length) return categories.slice(start, end);
    return [...categories.slice(start), ...categories.slice(0, end - categories.length)];
  };

  const displayedCategories = getDisplayedCategories(index);
  const categoryColors: Record<string, string> = {
    Parques: '#4CAF50',       // verde
    Museus: '#9C27B0',        // roxo
    Restaurantes: '#FF7043',  // laranja
    Praias: '#2196F3',        // azul
    Eventos: '#E91E63',       // rosa
    Lazer: '#FFC107',         // amarelo
    Mercado: '#8D6E63',       // marrom
    Hospedagem: '#3F51B5',    // azul escuro
    Exótico: '#009688',       // verde água
    Cultural: '#BA68C8',      // lilás
    Aventura: '#FF5722',      // laranja avermelhado
  };

  // Função para pegar cor (fallback se categoria não tiver cor)
  const getCategoryColor = (name: string) => categoryColors[name] || '#607D8B';

  return (
    <Portal>
      <Modal
        visible={visible}
        onDismiss={onClose}
        contentContainerStyle={styles.modalContainer}
      >
        <TouchableOpacity style={styles.buttonExit} onPress={onClose}>
          <MaterialCommunityIcons name="close" size={26} color="white" />
        </TouchableOpacity>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
          style={styles.keyboardView}
        >
          <Card style={styles.card} elevation={3}>
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
                  {categories.length > 0 && (
                    <View style={styles.carouselContainer}>
                      <TouchableOpacity onPress={handlePrev} style={styles.arrowButton}>
                        <MaterialCommunityIcons
                          name="chevron-left"
                          size={26}
                          color="#2B2D42"
                        />
                      </TouchableOpacity>
                      <FlatList
                        data={displayedCategories}
                        keyExtractor={(item, idx) => `${item}-${idx}`}
                        horizontal
                        scrollEnabled={false}
                        renderItem={({ item }) => (
                          <View style={[
                            styles.categoryBadge,
                            { backgroundColor: getCategoryColor(item) }
                          ]}>
                            <Text style={styles.categoryText}>{item}</Text>
                          </View>
                        )}
                        contentContainerStyle={styles.categoriesContainer}
                      />
                      <TouchableOpacity onPress={handleNext} style={styles.arrowButton}>
                        <MaterialCommunityIcons
                          name="chevron-right"
                          size={26}
                          color="#2B2D42"
                        />
                      </TouchableOpacity>
                    </View>
                  )}
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
