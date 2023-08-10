import { View, FlatList} from 'react-native'
import React from 'react'
import CardImage from './CardImage'


const ImageList = ({photos}) => {

  const renderItem = ({item}) => { //item es igual a cada objeto de la lista
    return <CardImage image={item} key={item.id}/> 
  }

  return (
    <View>
      <FlatList 
        data={photos}
        keyExtractor={item => item.id} //de pothos de obtiene el item 
        renderItem={renderItem} //para que cada item sea renderizado como CardImage
        numColumns={2}
      />
    </View>
  )
}


export default ImageList