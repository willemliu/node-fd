import { useState, useEffect } from 'react';
import AudioStore from '../stores/Audio';
import styled from 'styled-components';

export default () => {
    const [audio, setAudio] = useState('');

    useEffect(() => {
        AudioStore.subscribe(() => {
            setAudio(AudioStore.getAudio());
            (document.querySelector('audio') as HTMLAudioElement).play();
        });
    }, []);

    return audio ? (
        <StyledAudio>
            <audio controls src={audio} />
        </StyledAudio>
    ) : null;
};

const StyledAudio = styled.div`
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    display: flex;
    audio {
        flex: 1 1 auto;
    }
`;
