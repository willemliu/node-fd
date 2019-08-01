import { StoreBase, AutoSubscribeStore, autoSubscribe } from 'resub';

export interface Audio {
    playerview?: {
        audioUrl: string;
        title?: string;
        shareImageUrl?: string;
        shareDescription?: string;
    };
}

@AutoSubscribeStore
class AudioStore extends StoreBase {
    private _audio: Audio = {};

    setAudio(audio: Audio) {
        this._audio = audio;
        this.trigger();
    }

    @autoSubscribe
    getAudio() {
        return this._audio;
    }
}

export default new AudioStore();
