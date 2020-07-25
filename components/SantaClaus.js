import React from 'react';
import LottieView from 'lottie-react-native';

export default class SantaAnimation extends React.Component
{
    render()
    {
        return(
            <LottieView source={require('../assets/27729-waiting.json')}
            style={{width:'50%'}}
            autoPlay loop/>
        )
    }
}