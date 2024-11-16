// components
import Title from '@components/Title';
import SimplePageHeader from '@components/SimplePageHeader';
import ItemDetails from '@layout/item';

const Item = () => {
    return (
        <>
            <Title title="Item details" />
            <SimplePageHeader title="Item details" />
            <main>
                <ItemDetails />
            </main>
        </>
    );
}

export default Item