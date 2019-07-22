import uniqid from 'uniqid';

function getTheme(cssClass: string): any {
    switch (cssClass) {
        case 'themed theme1':
            return 'theme1';
        case 'themed theme2':
            return 'theme2';
        case 'themed theme3':
            return 'theme3';
        case 'themed theme4':
            return 'theme4';
        case 'themed theme5':
            return 'theme5';
        case 'themed theme6':
            return 'theme6';
        case 'themed theme7':
            return 'theme7';
    }
}

function getTeaserProps(
    teaser: any,
    teaserConfig: any = {},
    image: any = null
) {
    return {
        cardStyle: teaser.fullWidth ? 'longread' : 'default',
        bookmarked: teaserConfig.markFavouriteEnabled,
        key: `${teaser.id}-${uniqid()}`,
        id: teaser.id,
        title: teaser.title,
        description: teaser.intro,
        date: teaser.shortTime,
        readableAge: teaser.shortTime,
        subject: teaser.mainSection,
        url: teaser.publicationUrl,
        baseUrl: '',
        image: image,
        theme: teaser.picture ? getTheme(teaser.picture.cssClass) : null,
        sourceSets: teaser.picture
            ? [
                  {
                      media: '(max-width: 640px)',
                      srcSet: teaser.picture.imageUrlSmall,
                  },
                  {
                      media: '(max-width: 860px)',
                      srcSet: teaser.picture.imageUrlMedium,
                  },
                  {
                      media: '(min-width: 861px)',
                      srcSet: teaser.picture.imageUrlLarge,
                  },
              ]
            : [],
    };
}

export function getTeaserPropsFromComponents(components: any[]) {
    return components.map((component: any) => {
        const teaser = component.model.teaser;
        if (!teaser) {
            return;
        }
        const teaserConfig = component.model.teaserConfig;
        let image;
        if (teaser.picture) {
            image = {
                alt: teaser.picture.caption,
                src: teaser.picture.imageUrlSmall,
                title: teaser.picture.caption,
            };
        }
        return getTeaserProps(teaser, teaserConfig, image);
    });
}

export function getTeaserPropsFromBeursComponents(components: any[]) {
    return components.map((component: any) => {
        const teaser = component.teaser;
        if (!teaser) {
            return;
        }
        let image;
        if (teaser.picture) {
            image = {
                alt: teaser.picture.caption,
                src: teaser.picture.imageUrlSmall,
                title: teaser.picture.caption,
            };
        }
        return getTeaserProps(teaser, {}, image);
    });
}
