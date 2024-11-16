// components
import {Helmet} from 'react-helmet';

const Title = ({title}) => {
    return (
        <Helmet>
            <title>{title} | HeyWave Template</title>
        </Helmet>
    )
}

export default Title