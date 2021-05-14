import React from 'react';
import fetchProducts from './utils/mockAPI';

const Context = React.createContext({});

export const ContextProvider = (props) => {
  const [products, setProducts] = React.useState([]);
  const [filteredProducts, setFilteredProducts] = React.useState([]);
  const [filteredCategories, setFilteredCategories] = React.useState([]);
  const [inStockToggle, setInStockToggle] = React.useState(false);
  const [searchValue, setSearchValue] = React.useState('');

  const findCategories = (inputProducts) => {
    const foundCategories = [];
    inputProducts.forEach(p => {
      if (!foundCategories.includes(p.category)) {
        foundCategories.push(p.category)
      }
    });
    return foundCategories;
  }

  const handleFetchProducts = async () => {
    const p = await fetchProducts();
    setProducts(p);
    setFilteredProducts(p);
  }

  React.useEffect(() => {
    handleFetchProducts();
  }, []);

  React.useEffect(() => {
    setFilteredCategories(findCategories(products));
  }, [products]);
  
  const runFilter = (value, inStockPass = inStockToggle) => {
    const foundProducts = products.filter(p => {
      return (p.name.toUpperCase().includes(value.toUpperCase()) && (inStockPass ? p.inStock : true))
    });
    const foundCategories = findCategories(foundProducts);
    return { foundProducts, foundCategories };
  }

  const handleSetFilter = (value) => {
    setSearchValue(value);
    const { foundProducts, foundCategories } = runFilter(value);
    setFilteredProducts(foundProducts);
    setFilteredCategories(foundCategories);
  }

  const handleInStockFilter = () => {
    const toggle = !inStockToggle;
    setInStockToggle(toggle);
    const { foundProducts, foundCategories } = runFilter(searchValue, toggle);
    setFilteredProducts(foundProducts);
    setFilteredCategories(foundCategories);
  }

  return (
    <Context.Provider
      value={{
        handleSetFilter,
        filteredProducts,
        filteredCategories,
        handleInStockFilter,
        inStockToggle
      }}
    >
      {props.children}
    </Context.Provider>
  );
};

export default Context;
