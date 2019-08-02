import { useState, useEffect, RefObject } from 'react';
import AudioStore from '../stores/Audio';
import styled from 'styled-components';
import Link from 'next/link';
import React from 'react';

export default () => {
    const [audio, setAudio] = useState<any>();
    const [paused, setPaused] = useState(true);
    const [progress, setProgress] = useState(0);
    let audioRef: RefObject<HTMLAudioElement> = React.createRef();

    const seek = (e: React.MouseEvent) => {
        if (audioRef && audioRef.current) {
            const audioEl = audioRef.current;
            var percent =
                e.nativeEvent.offsetX /
                e.currentTarget.getBoundingClientRect().width;

            audioEl.currentTime = percent * audioEl.duration;
            setProgress(percent / 100);
        }
    };

    useEffect(() => {
        AudioStore.subscribe(() => {
            setAudio(AudioStore.getAudio());
            setPaused(false);
        });
        if (audioRef && audioRef.current) {
            const audioEl = audioRef.current;
            audioEl.addEventListener(
                'timeupdate',
                () => {
                    let percent =
                        (100 / audioEl.duration) * audioEl.currentTime;
                    if (percent === NaN) {
                        percent = 0;
                    }
                    setProgress(percent);
                },
                false
            );
        }
    }, []);

    useEffect(() => {
        if (!paused && audioRef.current) {
            audioRef.current.play();
        } else if (audioRef.current) {
            audioRef.current.pause();
        }
    }, [paused, audio]);

    useEffect(() => {
        const audioButton = document.querySelector('.article-audio-button');
        if (audioButton) {
            (audioButton as HTMLAudioElement).style.display = 'flex';
        }
    });

    const handleClick = () => {
        if (paused) {
            setPaused(false);
        } else {
            setPaused(true);
        }
    };

    return (
        <StyledAudio>
            <audio
                ref={audioRef}
                src={audio ? audio.playerview.audioUrl : null}
            />
            {audio ? (
                <>
                    <div>
                        <img src={audio.playerview.shareImageUrl} />
                        <Link
                            href={`/podcastArticle?articleId=${audio.playerview.articleId}`}
                            as={audio.playerview.publicationUrl}
                            passHref={true}
                        >
                            <a>
                                <h2>{audio.playerview.title}</h2>
                                <p>{audio.playerview.shareDescription}</p>
                            </a>
                        </Link>
                        <div onClick={handleClick}>
                            <button
                                className={`media-button${
                                    paused ? '' : ' pause'
                                }`}
                            ></button>
                        </div>
                    </div>
                    <progress max={100} value={progress} onClick={seek} />
                </>
            ) : null}
        </StyledAudio>
    );
};

const StyledAudio = styled.div`
    position: fixed;
    display: flex;
    flex-direction: column;
    bottom: 0;
    left: 0;
    right: 0;
    > div {
        height: 50px;
        background-color: rgba(0, 0, 0, 0.5);
        display: flex;
        img {
            height: 50px;
            flex: 0 1 auto;
        }
        > a {
            text-decoration: none;
            display: flex;
            color: inherit;
            flex: 1 1 auto;
            &:first-of-type {
                padding: 0.5rem;
            }
            flex-direction: column;
            max-width: calc(100vw - 165px);
            h2 {
                font-size: 1.2rem;
            }
            h2,
            p {
                color: white;
                font-family: Arial, Helvetica, sans-serif;
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
                padding: 0 1rem;
                margin: 0;
                cursor: pointer;
                display: flex;
            }
        }
    }

    progress {
        flex: 1 1 auto;
        width: 100%;
        background: rgba(0, 0, 0, 0.5);
        color: #ffd200;
        &::-webkit-progress-value {
            background-color: #ffd200;
            transition: width 0.5s ease-out;
        }
        &::-webkit-progress-bar {
            background: rgba(0, 0, 0, 0.5);
        }
        &::-moz-progress-bar {
            background-color: #ffd200;
        }
        cursor: pointer;
    }

    .media-button {
        border: 0;
        padding: 0;
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
