import { Text, View, TextInput, Button } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { useEffect, useState, useRef } from 'react';
import { GEOLOC_API_KEY } from '@env'

export default function App() {

    const [address, setAddress] = useState({
        latitude: "",
        longitude: "",
        streetName: ""
    })
    const [typedAddress, setTypedAddress] = useState();
    const mapRef = useRef();

    const findAddress = () => {
        fetch(`https://www.mapquestapi.com/geocoding/v1/address?key=${GEOLOC_API_KEY}&inFormat=kvp&outFormat=json&location=${typedAddress}&thumbMaps=false`, {
        })
        .then(response => response.json())
        .then (result => {
            setAddress({
            latitude: result.results[0].locations[0].displayLatLng.lat,
            longitude: result.results[0].locations[0].displayLatLng.lng,
            streetName: result.results[0].locations[0].street
        })
        const region = {
            latitude: result.results[0].locations[0].displayLatLng.lat,
            longitude: result.results[0].locations[0].displayLatLng.lng,
            latitudeDelta: 0.0322,
            longitudeDelta: 0.0221,
          };
          mapRef.current.animateToRegion(region, 1000);
        })
        .catch(error => console.log("error", error))
    }

    return (
    <View style={{ flex: 1 }}>
        <MapView
            ref={mapRef}
            style={{ flex: 1 }}
            initialRegion={{
                latitude: 60.200692,
                longitude: 24.934302,
                latitudeDelta: 0.0322,
                longitudeDelta: 0.0221,
            }}> 
            <Marker
                coordinate={{
                    latitude: Number(address.latitude),
                    longitude: Number(address.longitude)}}
                    title={address.streetName}/>
        </MapView>
        <View>
        <TextInput
                value={typedAddress}
                onChangeText={text => setTypedAddress(text)}
                style={{ width: 600, borderColor: 'gray', borderWidth: 1, marginBottom: 15, marginTop: 20, justifyContent: 'center' }}
            />
        <Button title="Show" onPress={findAddress}></Button>
        </View>
    </View>
    );
}


