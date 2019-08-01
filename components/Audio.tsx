import { useState, useEffect } from 'react';
import AudioStore from '../stores/Audio';

export default () => {
    const [audio, setAudio] = useState('');

    useEffect(() => {
        AudioStore.subscribe(() => {
            setAudio(AudioStore.getAudio());
            (document.querySelector('audio') as HTMLAudioElement).play();
        });
    }, []);

    return (
        <>
            <audio controls src={audio} />
        </>
    );
};
