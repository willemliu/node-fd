import { useState, useEffect } from 'react';
import AudioStore from '../stores/Audio';
import styled from 'styled-components';

export default () => {
    const [audio, setAudio] = useState<any>();
    const [paused, setPaused] = useState(false);

    useEffect(() => {
        AudioStore.subscribe(() => {
            setAudio(AudioStore.getAudio());
            setPaused(false);
            (document.querySelector('audio') as HTMLAudioElement).play();
        });
    }, []);

    const handleClick = () => {
        if ((document.querySelector('audio') as HTMLAudioElement).paused) {
            (document.querySelector('audio') as HTMLAudioElement).play();
            setPaused(false);
        } else {
            (document.querySelector('audio') as HTMLAudioElement).pause();
            setPaused(true);
        }
    };

    return audio ? (
        <StyledAudio>
            <audio src={audio.playerview.audioUrl} />
            <div>
                <img src={audio.playerview.shareImageUrl} />
                <div>
                    <h2>{audio.playerview.title}</h2>
                    <p>{audio.playerview.shareDescription}</p>
                </div>
                <div onClick={handleClick}>
                    {paused ? (
                        'Paused!!!'
                    ) : (
                        <span className="play-button">
                            <span className="icon">
                                <span className="icon-play" />
                            </span>
                        </span>
                    )}
                </div>
            </div>
        </StyledAudio>
    ) : null;
};

const StyledAudio = styled.div`
    position: fixed;
    height: 60px;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgba(0, 0, 0, 0.5);
    > div {
        display: flex;
        img {
            height: 60px;
        }
        > div {
            display: flex;
            &:first-of-type {
                padding: 0.5rem;
            }
            flex-direction: column;
            max-width: calc(100vw - 200px);
            h2 {
                font-size: 1.2rem;
            }
            h2,
            p {
                font-family: Arial, Helvetica, sans-serif;
                filter: invert(1);
                margin: 0;
            }
            p {
                font-size: 0.8rem;
                text-overflow: ellipsis;
                white-space: nowrap;
                overflow: hidden;
            }

            & + div {
                align-items: center;
                justify-content: center;
                flex: 1 1 auto;
                margin: 0;
                cursor: pointer;
            }
        }
    }
`;
