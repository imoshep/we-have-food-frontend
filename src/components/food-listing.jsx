import React, { Component } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Swal from "sweetalert2";

class FoodListing extends Component {
    state = { isSelected: false }

    fireFavoritesClick = ({ currentTarget: icon }) => {
        let {isSelected} = this.state;
        const foodId = icon.getAttribute("data-food-id");
        this.props.registerFavorites(foodId)
        isSelected = !isSelected;
        this.setState({isSelected})

    }
    
    renderTitle(listing, addToFavorites) {
        const {isSelected} = this.state;

        return (<React.Fragment>
            {isSelected 
            ? <FontAwesomeIcon
                data-food-id={listing._id}
                onClick={(e) => this.fireFavoritesClick(e)}
                icon="star"
            />
            : <FontAwesomeIcon
                data-food-id={listing._id}
                onClick={(e) => this.fireFavoritesClick(e)}
                icon={['far', 'star']}
            />} &nbsp;
            {listing.foodTitle}
        </React.Fragment>)
    }

    renderImage(listing, height) {
        return (<img
            src={listing.foodImage}
            alt={listing.foodTitle}
            height={height}
            onClick={() => Swal.fire({
            text: listing.foodTitle,
            imageUrl: listing.foodImage
            })}
        />)
    }

    renderUser(listing) {
        return (<p>
            {listing.user.name}
            <br />
            {listing.user.phone}
            <br />
            {listing.user.email}
            </p>)
    }

    render() { 
        let {listing, displayMore, addToFavorites, isMD} = this.props;
        return (<React.Fragment>
            {isMD 
            ? <React.Fragment>
                <tr>
                    <td>
                        {this.renderTitle(listing, this.fireFavoritesClick)}  
                    </td>
                    <td>
                        {listing.foodDesc}
                    </td>
                    <td>
                        {this.renderImage(listing, '150')}
                    </td>
                    <td>
                        {this.renderUser(listing)}
                    </td>
                </tr>
            </React.Fragment>
            : <React.Fragment>
                <tr onClick={displayMore}>
                    <td>
                        {this.renderTitle(listing, addToFavorites)}  
                    </td>
                    <td style={{display: "flex", justifyContent: "space-between", gap: '8px'}}>
                        {listing.foodDesc}
                        <FontAwesomeIcon icon="caret-down" size='lg'/>
                    </td>
                </tr>
                <tr style={{ display: "none" }}>
                    <td>
                        {this.renderImage(listing, '100')}
                    </td>
                    <td>
                        {this.renderUser(listing)}
                    </td>
                </tr>
            </React.Fragment>
            }
        </React.Fragment>);
    }
}
 
export default FoodListing;



