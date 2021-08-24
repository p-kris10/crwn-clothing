
import CollecitonItem from '../../components/collection-item/colleciton-item.component';
import './collection.styles.scss';
import { connect } from 'react-redux';
import { selectCollection } from '../../redux/shop/shop.selectors';

const CollectionPage = ({collection}) =>{
    const {title,items} = collection;
    return(
        <div className='collection-page'>
            <h2 className='title'>{title}</h2>
            <div className='items'>
                {
                    items.map(item => <CollecitonItem key={item.id} item={item} />)
                }
            </div>
        </div>
    )
}

const mapSateToProps = (state,ownProps) =>({
    collection : selectCollection(ownProps.match.params.collectionId)(state)
})

export default connect(mapSateToProps)(CollectionPage);