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

    useEffect(() => {
        const audioButton = document.querySelector('.article-audio-button');
        if (audioButton) {
            (audioButton as HTMLAudioElement).style.display = 'flex';
        }
    });

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
                    <button
                        className={`media-button${paused ? '' : ' pause'}`}
                    ></button>
                </div>
            </div>
        </StyledAudio>
    ) : null;
};

const StyledAudio = styled.div`
    position: sticky;
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
                text-overflow: ellipsis;
                white-space: nowrap;
                overflow: hidden;
            }
            p {
                font-size: 0.8rem;
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

    .media-button {
        border: 0;
        background: transparent;
        box-sizing: border-box;
        width: 0;
        height: 2rem;
        outline: none;

        border-color: transparent transparent transparent #ffd200;
        transition: 100ms all ease;
        cursor: pointer;

        // play state
        border-style: solid;
        border-width: 1rem 0 1rem 2rem;

        &.pause {
            border-style: double;
            border-width: 0px 0 0px 2rem;
        }

        &:hover {
            border-color: transparent transparent transparent #ffd200;
        }
    }
`;
