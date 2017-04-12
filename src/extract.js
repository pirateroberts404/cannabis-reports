import {
  sendRequest,
  validateUcpc,
} from './util';

export default function extract(): object {
  function validateExtractType(extractType: string): boolean {
    const validTypes = [
      'kief',
      'hash',
      'water-hash',
      'oil',
      'wax',
      'crumble',
      'honeycomb',
      'shatter',
      'vaporizer-disposable',
      'vaporizer-cartridge',
    ];
    if (!extractType || typeof(extractType) !== 'string') return false;
    if (validTypes.indexOf(extractType) < 0) return false;
    return true;
  }

  return {

    all(options: object = {}): undefined {
      return new Promise((resolve: object, reject: object): undefined => {
        sendRequest('extracts', options, (err: string, data: object): undefined => {
          if (err) return reject(new Error(err));
          return resolve(data);
        });
      });
    },

    type(extractType: string, options: object = {}): undefined {
      return new Promise((resolve: object, reject: object): undefined => {
        if (!validateExtractType(extractType.toLowerCase())) {
          reject(new Error('Invalid Extract Type.'));
        }
        sendRequest(`extracts/type/${extractType}`,
          options,
          (err: string, data: object): undefined => {
            if (err) return reject(new Error(err));
            return resolve(data);
          }
        );
      });
    },

    extract(ucpc: string): undefined {
      return new Promise((resolve: object, reject: object): undefined => {
        if (!validateUcpc(ucpc)) reject(new Error('Invalid UCPC.'));
        sendRequest(`extracts/${ucpc}`, null, (err: string, data: object): undefined => {
          if (err) return reject(new Error(err));
          return resolve(data);
        });
      });
    },

    user(ucpc: string): undefined {
      return new Promise((resolve: object, reject: object): undefined => {
        if (!validateUcpc(ucpc)) reject(new Error('Invalid UCPC.'));
        sendRequest(`extracts/${ucpc}/user`, null, (err: string, data: object): undefined => {
          if (err) return reject(new Error(err));
          return resolve(data);
        });
      });
    },

    reviews(ucpc: string, options: object = {}): undefined {
      return new Promise((resolve: object, reject: object): undefined => {
        if (!validateUcpc(ucpc)) reject(new Error('Invalid UCPC.'));
        sendRequest(`extracts/${ucpc}/reviews`, options, (err: string, data: object): undefined => {
          if (err) return reject(new Error(err));
          return resolve(data);
        });
      });
    },

    effectsFlavors(ucpc: string): undefined {
      return new Promise((resolve: object, reject: object): undefined => {
        if (!validateUcpc(ucpc)) reject(new Error('Invalid UCPC.'));
        sendRequest(`extracts/${ucpc}/effectsFlavors`,
          null,
          (err: string, data: object): undefined => {
            if (err) return reject(new Error(err));
            return resolve(data);
          }
        );
      });
    },

    producer(ucpc: string): undefined {
      return new Promise((resolve: object, reject: object): undefined => {
        if (!validateUcpc(ucpc)) reject(new Error('Invalid UCPC.'));
        sendRequest(`extracts/${ucpc}/producer`, null, (err: string, data: object): undefined => {
          if (err) return reject(new Error(err));
          return resolve(data);
        });
      });
    },

    strain(ucpc: string): undefined {
      return new Promise((resolve: object, reject: object): undefined => {
      if (!validateUcpc(ucpc)) reject(new Error('Invalid UCPC.'));
      sendRequest(`extracts/${ucpc}/strain`, null, (err: string, data: object): undefined => {
        if (err) return reject(new Error(err));
        return resolve(data);
      });
    });
    },

    availability(ucpc: string, lat: string, lng: string, options: object = {}): undefined {
      return new Promise((resolve: object, reject: object): undefined => {
      if (!validateUcpc(ucpc)) reject(new Error('Invalid UCPC.'));
      if (!lat) reject(new Error('Latitude is required'));
      if (!(typeof(lat) === 'string' || typeof(lat) === 'number')) {
        reject(new Error('Latitude must be a string or number.'));
      }
      if (!lng) reject(new Error('Longitude is required'));
      if (!(typeof(lng) === 'string' || typeof(lng) === 'number')) {
        reject(new Error('Longitude must be a string or number.'));
      }
      const radius = (options && options.radius) ? `/${options.radius}` : '';
      sendRequest(`extracts/${ucpc}/availability/geo/${lat}/${lng}${radius}`,
        options,
        (err: string, data: object): undefined => {
          if (err) return reject(new Error(err));
          return resolve(data);
        }
      );
    });
    },

  };
}
