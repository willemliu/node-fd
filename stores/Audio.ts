import { StoreBase, AutoSubscribeStore, autoSubscribe } from 'resub';

@AutoSubscribeStore
class AudioStore extends StoreBase {
    private _audioUrl = '';

    setAudio(audioUrl: string) {
        this._audioUrl = audioUrl;
        this.trigger();
    }

    @autoSubscribe
    getAudio() {
        return this._audioUrl;
    }
}

export default new AudioStore();
