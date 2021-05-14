import { Typography, TextField, Table, TableRow, TableCell, Button, Checkbox } from '@material-ui/core';
import React from 'react';
import Context from './context';

const modalStyle = {
  position: 'fixed', 
  zIndex: 1,
  left: 0,
  top: 0,
  width: '100%', 
  height: '100%',
  overflow: 'auto',
  backgroundColor: 'rgba(0,0,0,0.9)',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center'
};

const Page = () => {
  const {
    filteredProducts,
    filteredCategories,
    handleSetFilter,
    inStockToggle,
    handleInStockFilter,
  } = React.useContext(Context);

  const [dialogProduct, setDialogProduct] = React.useState(undefined);

  const handleSearch = (e) => {
    handleSetFilter(e.target.value);
  };

  const openDialog = (product) => () => {
    setDialogProduct(product);
  };

  const closeDialog = () => {
    setDialogProduct(undefined);
  };

  return (
    <div>
      <Typography variant="h2" >Products</Typography>
      <TextField
        placeholder="Search products"
        onChange={handleSearch}
      />
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <Typography>
          In stock products only
        </Typography>
        <Checkbox onChange={handleInStockFilter} checked={inStockToggle} />
      </div>
      <Table>
        {filteredCategories.length === 0 && (
          <Typography variant="h5">No Products Found.</Typography>
        )}
        {filteredCategories.map(cat => (
          <>
            <TableRow>
              <TableCell colSpan={3}>
                <Typography variant="h6" >{cat}</Typography>
              </TableCell>
            </TableRow>
            {filteredProducts
              .filter(p => p.category === cat)
              .map(p => (
                <TableRow>
                  <TableCell>
                    <Typography color={p.inStock ? 'inherit' : 'secondary'}>
                      {p.name}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    {p.price}
                  </TableCell>
                  <TableCell>
                    <Button onClick={openDialog(p)}>
                      View Details
                    </Button>
                  </TableCell>
                </TableRow>
              )
            )}
          </>
        ))}
      </Table>
      {Boolean(dialogProduct) && (
        <div
          onClick={closeDialog}
          style={modalStyle}
        >
          <img
            style={{ margin: 'auto', display: 'block', maxHeight: '100%'  }}
            src={dialogProduct?.imageUrl}
            alt={dialogProduct?.name}
          />
        </div>
      )}
    </div>
  );
}

export default Page;
