import React from 'react';
import { render } from '@testing-library/react';
import SpecialsListComponent from '../../components/SpecialsListComponent';

describe('Specials podcast list component', () => {
    it('should render branded podcasts correctly', () => {
        const { asFragment } = render(
            <SpecialsListComponent
                title="Specials"
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
