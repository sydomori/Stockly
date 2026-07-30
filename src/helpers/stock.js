export function getStockStatus(stockQuantity){
    if(stockQuantity === 0) {
        return {label: 'Out of Stock', color: 'error'};
    }
    if (stockQuantity < 10) {
        return {label: 'Low Stock', color: 'warning'};
    }
    return {label: 'In Stock', color: 'success'}
}