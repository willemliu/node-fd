import React from 'react';
import { render, cleanup, act, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Audio from '../../components/Audio';
import AudioStore from '../../stores/Audio';

declare var window: any;
window.HTMLMediaElement.prototype.load = () => {
    /* do nothing */
};
window.HTMLMediaElement.prototype.play = () => {
    /* do nothing */
};
window.HTMLMediaElement.prototype.pause = () => {
    /* do nothing */
};
window.HTMLMediaElement.prototype.addTextTrack = () => {
    /* do nothing */
};

describe('Audio component', () => {
    afterEach(cleanup);

    it('should render correctly initially without data', () => {
        const { asFragment } = render(<Audio />);
        expect(asFragment()).toMatchSnapshot();
    });

    it('should render correctly with audio data', () => {
        const { asFragment } = render(<Audio />);
        act(() => {
            AudioStore.setAudio({
                playerview: {
                    audioUrl: 'url to audio',
                    title: 'title of the audio',
                    shareDescription: 'description of the audio',
                    shareImageUrl: 'image url',
                },
            });
        });
        expect(asFragment()).toMatchSnapshot();
    });

    it('should handle play/pause correctly', () => {
        const { container, asFragment } = render(<Audio />);
        act(() => {
            AudioStore.setAudio({
                playerview: {
                    audioUrl: 'url to audio',
                    title: 'title of the audio',
                    shareDescription: 'description of the audio',
                    shareImageUrl: 'image url',
                },
            });
        });
        const waveButton = container.querySelector('.wave-icon');
        act(() => {
            fireEvent.click(waveButton as HTMLElement);
        });
        const playPauseButton = container.querySelector('.media-button');
        act(() => {
            fireEvent.click(playPauseButton as HTMLElement);
        });
        expect(asFragment()).toMatchSnapshot();
        act(() => {
            fireEvent.click(playPauseButton as HTMLElement);
        });
        expect(asFragment()).toMatchSnapshot();
    });
});
