import React from 'react';
import { CardSection, StyledAnchor } from '../styles/Bnr';
import { PureComponent } from 'react';

export default class CardAnchor extends PureComponent<any, any> {
    render() {
        const item = this.props.item;
        return (
            <StyledAnchor {...this.props}>
                {item.picture ? (
                    <figure>
                        <picture>
                            <source
                                media="(max-width:640px)"
                                srcSet={item.picture.imageUrlSmall}
                            />
                            <source
                                media="(max-width:860px)"
                                srcSet={item.picture.imageUrlMedium}
                            />
                            <source
                                media="(min-width:861px)"
                                srcSet={item.picture.imageUrlLarge}
                            />
                            <img
                                src={item.picture.imageBaseUrl}
                                alt={item.title}
                            />
                        </picture>
                    </figure>
                ) : null}
                <CardSection>
                    <h3>{item.title}</h3>
                    <time>Duur: {item.durationInMinutes} min</time>
                    <h3>{item.programTitle}</h3>
                </CardSection>
            </StyledAnchor>
        );
    }
}
