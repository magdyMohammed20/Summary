import { Dimensions, FlatList, StyleSheet, View } from 'react-native'
import React from 'react'
import AppHeader from '../../components/home/AppHeader'
import ProductCard from '../../components/cards/ProductCard'
import sharedStyle from '../../styles/sharedStyle'
import { vs } from 'react-native-size-matters'
import { products } from '../../data/products'
const HomeScreen = () => {
    const { width } = Dimensions.get('window');
    const containerPadding = sharedStyle.sharedHorizontalPadding; // e.g., 15
    const gap = 16;

    const availableWidth = width - (containerPadding * 2);
    const cardWidth = (availableWidth - gap) / 2;

    return (
        <View style={{ flex: 1 }}>
            <AppHeader />

            <FlatList
                contentContainerStyle={{
                    paddingBottom: vs(20),
                    paddingTop: vs(20),
                    paddingHorizontal: containerPadding, // Equal padding here
                }}
                showsVerticalScrollIndicator={false}
                columnWrapperStyle={{
                    justifyContent: 'space-between', // Evenly distribute items
                    marginBottom: 16,
                }}
                data={products}
                numColumns={2}
                keyExtractor={({ id }) => id.toString()}
                renderItem={({ item }) => {

                    return (
                        <View style={{
                            width: cardWidth,
                        }}>
                            <ProductCard
                                onAddToCart={() => { }}
                                title={item.title}
                                price={item.price.toString()}
                                imageUrl={item.imageURL}
                            />
                        </View>
                    );
                }}
            />
        </View>
    )
}

export default HomeScreen

const styles = StyleSheet.create({
    cardsContainer: {
        paddingHorizontal: sharedStyle.sharedHorizontalPadding,
        paddingVertical: sharedStyle.sharedVerticalPadding,

    }
})