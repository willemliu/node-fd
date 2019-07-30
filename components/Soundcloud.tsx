export default (props: any) => {
    return (
        <iframe
            width="100%"
            height="300"
            scrolling="no"
            frameBorder="no"
            allow="autoplay"
            src={
                props.src
                    ? props.src
                    : 'https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/235867951&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true'
            }
        />
    );
};
