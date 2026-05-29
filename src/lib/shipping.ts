import shippingData from '@/data/shipping_rates.json';

export interface ShippingMethod {
  id: string;
  name: string;
  cost: number;
  days: string;
}

export const calculateShipping = (originCity: string, destinationCountry: string): ShippingMethod[] => {
  const logistics = shippingData.cities_logistics;
  
  // Find origin region and city data
  let originRegion = '';
  let cityLogistics: any = null;

  for (const [region, cities] of Object.entries(logistics)) {
    const citiesObj = cities as Record<string, any>;
    if (citiesObj[originCity]) {
      originRegion = region;
      cityLogistics = citiesObj[originCity];
      break;
    }
  }

  if (!cityLogistics) {
    // Default fallback if city not found
    return [
      { id: 'standard', name: 'Standard Shipping', cost: 15, days: '5-10' },
      { id: 'express', name: 'Express Courier', cost: 35, days: '2-4' }
    ];
  }

  // Map destination country to region
  let destRegion = '';
  if (destinationCountry === 'United States') destRegion = 'USA';
  else if (['United Kingdom', 'France', 'Italy', 'Germany', 'Spain'].includes(destinationCountry)) destRegion = 'Europe';
  else if (destinationCountry === 'China') destRegion = 'China';

  const isInternational = originRegion !== destRegion;

  if (!isInternational) {
    // Domestic shipping
    const standardCost = parseInt(cityLogistics.standard_shipping.cost_range_usd || cityLogistics.standard_shipping.cost_range_eur) || 10;
    const expressCost = parseInt(cityLogistics.express_shipping.cost_range_usd || cityLogistics.express_shipping.cost_range_eur) || 30;
    
    return [
      { 
        id: 'standard', 
        name: 'Standard Shipping', 
        cost: standardCost, 
        days: cityLogistics.standard_shipping.days 
      },
      { 
        id: 'express', 
        name: 'Express Courier', 
        cost: expressCost, 
        days: cityLogistics.express_shipping.days 
      }
    ];
  } else {
    // International shipping
    const crossBorderKey = `${originRegion.toLowerCase()}_to_${destRegion.toLowerCase()}`;
    const cbLogistics = (shippingData.cross_border_logistics as any)[crossBorderKey];
    
    // International rates (estimated premium)
    const baseStandard = 35;
    const baseExpress = 65;

    if (cbLogistics) {
      return [
        { 
          id: 'standard', 
          name: 'International Standard', 
          cost: baseStandard, 
          days: cbLogistics.standard_days 
        },
        { 
          id: 'express', 
          name: 'International Express', 
          cost: baseExpress, 
          days: cbLogistics.express_days 
        }
      ];
    } else {
      // Fallback for missing cross-border pairs
      return [
        { id: 'standard', name: 'International Standard', cost: 40, days: '14-30' },
        { id: 'express', name: 'International Express', cost: 75, days: '5-12' }
      ];
    }
  }
};
