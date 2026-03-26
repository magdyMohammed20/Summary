(1) FlatList
---------------
==> For Render List Of Items
==> dummyData : Is Array Of Data To Render
==> keyExtractor : Is Function To Extract Unique Key For Each Item
==> renderItem : Is Function To Render Component For Each Item
==> numColumns : Is Number Of Columns In The Grid
==> columnWrapperStyle : Is Style For Each Row Wrapper


    <FlatList
        data={dummyData}
        keyExtractor={item => item.id}
        renderItem={() => <MeditationCard />}
        numColumns={2}
        columnWrapperStyle={{ justifyContent: 'space-between', marginBottom: vs(16) }}
    />

(2) For Rendered Component We Can Resize it's width for fit the Screen In 2 Columns
-------------------------------------------------------------------------------------

    import { Dimensions,  } from 'react-native'
    import { s, vs } from 'react-native-size-matters'

    const windowWidth = Dimensions.get('window').width
    
    // 14 is the gap between the both columns 
    // 3 is the 3 spaces that around both cards in same row
    // 2 is the number of columns
    const cardWidth = (windowWidth - s(14) * 3) / 2

    imageBackground: {
        width: cardWidth
    }

(3) Sending the data to the Rendered component of FlatList
-------------------------------------------------------------
==> And not forget to add props for 'MeditationCard'

    <FlatList

        renderItem={({ item }) => <MeditationCard image={item.image} title={item.title} date={item.date} />}
    
    />


(4) Additional Style
-----------------------
==> contentContainerStyle : For Styling Container of the List And Here It Add Padding Bottom To Avoid Overlap With The Bottom Tab Bar

==> showsVerticalScrollIndicator : for enable/disable show scroll indicator if list is bigger

    <FlatList
        contentContainerStyle={{ paddingBottom: vs(170) }}
        showsVerticalScrollIndicator={false}
    />