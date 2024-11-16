// components
import TeamList from '@components/TeamList';
import SectionHeader from '@components/SectionHeader';
import GradientBtn from '@ui/GradientBtn';

const Team = () => {
    return (
        <section>
            <div className="container">
                <SectionHeader title="Meet the team ⚡">
                    <GradientBtn href="/team">View all</GradientBtn>
                </SectionHeader>
                <TeamList variant="preview"/>
            </div>
        </section>
    );
}

export default Team