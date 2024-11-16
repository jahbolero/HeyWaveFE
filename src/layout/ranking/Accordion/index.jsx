// styled components
import {RankingAccordion, RankingSummary, RankingDetails} from './style';

// components
import {CollectionCell, CryptoCell, PercentCell, TextCell} from '@constants/ranking';
import Pagination from '@ui/Pagination';

// hooks
import usePagination from '@hooks/usePagination';

// utils
import {memo} from 'react';

// data placeholder
import ranking from '@db/ranking';

const Accordion = ({period, category, type}) => {
    const dataByCategory = category.value === 'all' ? ranking : ranking.filter(item => item.categories && item.categories.includes(category.value));
    const pagination = usePagination(dataByCategory, 15);

    return (
        <div ref={pagination.containerRef}>
            <div className="d-flex flex-column g-15">
                {
                    pagination.currentItems().map((item, index) => {
                        const {collection, volume, h24, d7, floor, owners, items} = item;

                        return (
                            <RankingAccordion key={index}>
                                <RankingSummary>
                                    <CollectionCell value={collection} />
                                    <i className="icon icon-angle-down" />
                                </RankingSummary>
                                <RankingDetails>
                                    <table>
                                        <tbody>
                                            <tr>
                                                <td className="property text-bold text-light">Volume</td>
                                                <td className="value">
                                                    <CryptoCell value={volume} type={type} period={period} />
                                                </td>
                                            </tr>
                                            <tr>
                                                <td className="property text-bold text-light">24h %</td>
                                                <td className="value">
                                                    <PercentCell value={h24} period={period} />
                                                </td>
                                            </tr>
                                            <tr>
                                                <td className="property text-bold text-light">7d %</td>
                                                <td className="value">
                                                    <PercentCell value={d7} period={period} />
                                                </td>
                                            </tr>
                                            <tr>
                                                <td className="property text-bold text-light">Floor Price</td>
                                                <td className="value">
                                                    <CryptoCell value={floor} type={type} period={period} />
                                                </td>
                                            </tr>
                                            <tr>
                                                <td className="property text-bold text-light">Owners</td>
                                                <td className="value">
                                                    <TextCell value={owners} period={period} />
                                                </td>
                                            </tr>
                                            <tr>
                                                <td className="property text-bold text-light">Items</td>
                                                <td className="value">
                                                    <TextCell value={items} period={period} />
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </RankingDetails>
                            </RankingAccordion>
                        )
                    })
                }
            </div>
            {pagination.maxPage > 1 && <Pagination pagination={pagination} />}
        </div>
    )
}

export default memo(Accordion);