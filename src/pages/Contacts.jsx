// components
import Title from '@components/Title';
import PageHeader from '@components/PageHeader';
import ContactsForm from '@layout/contacts/ContactsForm';
import ContactsInfo from '@layout/contacts/ContactsInfo';

const Contacts = () => {
    return (
        <>
            <Title title="Contacts"/>
            <PageHeader title="Contacts"/>
            <main>
                <section>
                    <div className="container">
                        <ContactsForm/>
                        <ContactsInfo/>
                    </div>
                </section>
            </main>
        </>
    )
}

export default Contacts