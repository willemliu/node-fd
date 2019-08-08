import React from 'react';
import { render } from '@testing-library/react';
import LatestPodcastListComponent from '../../components/LatestPodcastListComponent';

describe('Branded podcast list component', () => {
    it('should render branded podcasts correctly', () => {
        const { asFragment } = render(
            <LatestPodcastListComponent
                title="Latest podcasts"
                items={[
                    {
                        id: 1,
                        title: 'title of the podcast',
                        publicationUrl: 'publication url',
                        programTitle: 'program title',
                        durationInMinutes: 3,
                        picture: {
                            imageUrlSmall: 'small image url',
                            imageUrlMedium: 'medium image url',
                            imageUrlLarge: 'large image url',
                            imageBaseUrl: 'base image url',
                        },
                    },
                    {
                        id: 2,
                        title: 'title of the podcast2',
                        publicationUrl: 'publication url2',
                        programTitle: 'program title2',
                        durationInMinutes: 4,
                    },
                ]}
            />
        );
        expect(asFragment()).toMatchSnapshot();
    });
});
