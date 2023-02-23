import Cookies from 'js-cookie'
import {Component} from 'react'
import Loader from 'react-loader-spinner'

import ProductCard from '../ProductCard'
import './index.css'

class AllProductsSection extends Component {
  state = {
    productsList: [],
    isLoader: true,
  }

  componentDidMount = () => {
    this.getProducts()
  }

  getProducts = async () => {
    const apiUrl = 'https://apis.ccbp.in/products'
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {Authorization: `Bearer ${jwtToken}`},
    }

    const response = await fetch(apiUrl, options)
    if (response.ok === true) {
      const fetchedData = await response.json()
      const updatedData = fetchedData.products.map(product => ({
        title: product.title,
        brand: product.brand,
        price: product.price,
        id: product.id,
        imageUrl: product.image_url,
        rating: product.rating,
      }))
      this.setState({productsList: updatedData, isLoader: false})
    }
  }

  renderLoader = () => (
    <div className="loader-container">
      <Loader type="Puff" color="blue" height={50} width={80} />
    </div>
  )

  renderProductsList = () => {
    const {productsList, isLoader} = this.state
    return (
      <div>
        <h1 className="products-list-heading">All Products</h1>
        {isLoader ? (
          this.renderLoader()
        ) : (
          <ul className="products-list">
            {productsList.map(product => (
              <ProductCard productData={product} key={product.id} />
            ))}
          </ul>
        )}
      </div>
    )
  }

  render() {
    return <>{this.renderProductsList()}</>
  }
}

export default AllProductsSection
