import delay from './delay';

// This file mocks a web API by working with the hard-coded data below.
// It uses setTimeout to simulate the delay of an AJAX call.
// All calls return promises.

const localstore = (typeof localStorage !== 'undefined')
  ? localStorage
  : { getItem: () => null, setItem: () => {} };

const localAgencies = localstore.getItem('agencies');
const agencies = (localAgencies)
  ? JSON.parse(localAgencies)
  : {};

const getNextId = () => Object.keys(agencies).length + 1;

const getAgencyFromTaxId = (taxId) => {
  const keys = Object.keys(agencies);
  const key = keys.findIndex(idx => agencies[idx].taxId === taxId);
  const id = keys[key];
  return (id !== -1) ? agencies[id] : null;
};

const storeAgency = (id, saved) => {
  const agency = { ...saved };
  if (id) {
    agencies[id] = agency;
  } else {
    const nextId = getNextId();
    agency.id = nextId;
    agencies[nextId] = agency;
  }
  localstore.setItem('agencies', JSON.stringify(agencies));
  return agency;
};

const defaultAgency = {
  id: 0,
  status: 'new',
  agencyName: '',
  taxId: '',
};

class AgencyApi {
  static loadAgency(id) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (!agencies[id]) {
          return reject(new Error('Agency not found'));
        }

        const agency = { ...agencies[id] };
        return resolve(agency);
      }, delay);
    });
  }

  static newAgency(saved) {
    return new Promise((resolve, reject) => {
      const agency = { ...defaultAgency, ...saved };
      setTimeout(() => {
        // Simulate server-side validation
        const existing = getAgencyFromTaxId(agency.taxId);
        if (existing) {
          return reject(new Error('That Agency Tax ID has already been registered.'));
        }

        return resolve(storeAgency(null, agency));
      }, delay);
    });
  }

  static saveAgency(id, saved) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (!agencies[id]) {
          return reject(new Error('Agency not found'));
        }

        const agency = { ...agencies[id], ...saved };
        return resolve(storeAgency(id, agency));
      }, delay);
    });
  }
}

export default AgencyApi;
