
export const calculateDeliveryCharge = (distance: number, orderTotal: number) => {
    if (isNaN(distance) || distance <= 0) return 0;

    // const MAX_DELIVERY_RADIUS = 100;
    // if (distance > MAX_DELIVERY_RADIUS) return -1; // Indicate out of range

    // Logic: 
    // If order < 300 and distance <= 5km, compulsory 40 Rs charge (as per CheeniNamak code logic: if dist <= 5 return 40).
    if (orderTotal < 300) {
        if (distance <= 5) {
            return 40;
        } else {
            // For > 5km, charge 10 Rs per km (full distance) as per CheeniNamak logic
            return Math.ceil(distance * 10);
        }
    } else {
        // orderTotal >= 300
        // Free delivery under 5km
        if (distance <= 5) return 0;
        // Above 5km, charge for extra distance beyond 5km at 10 Rs/km
        return Math.ceil((distance - 5) * 10);
    }
};

export const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
    const R = 6371; // Radius of the earth in km
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLon = (lon2 - lon1) * (Math.PI / 180);
    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const d = R * c; // Distance in km
    return d;
};
