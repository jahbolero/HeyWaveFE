// components
import Video from '@components/Video';
import SectionHeader from '@components/SectionHeader';

// assets
import cover from '@assets/home/cover.webp';

const Presentation = () => {
    return (
        <section>
            <div className="container">
                <SectionHeader title="Meet HeyWave ⚡" />
                <Video cover={cover} />
            </div>
        </section>
    )
}

export default Presentation