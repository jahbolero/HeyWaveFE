// components
import Title from '@components/Title';
import PageHeader from '@components/PageHeader';
import TeamList from '@components/TeamList';

const Team = () => {
    return (
        <>
            <Title title="Team"/>
            <PageHeader title="Our team"/>
            <main>
                <section>
                    <div className="container">
                        <TeamList />
                    </div>
                </section>
            </main>
        </>
    )
}

export default Team