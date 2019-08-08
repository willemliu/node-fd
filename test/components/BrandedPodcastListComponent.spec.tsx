import React from 'react';
import { render } from '@testing-library/react';
import BrandedPodcastListComponent from '../../components/BrandedPodcastListComponent';

describe('Branded podcast list component', () => {
    it('should render branded podcasts correctly', () => {
        const { asFragment } = render(
            <BrandedPodcastListComponent
                title="Branded podcasts"
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
                        picture: {
                            imageUrlSmall: 'small image url2',
                            imageUrlMedium: 'medium image url2',
                            imageUrlLarge: 'large image url2',
                            imageBaseUrl: 'base image url2',
                        },
                    },
                ]}
            />
        );
        expect(asFragment()).toMatchSnapshot();
    });
});
