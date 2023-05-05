export const rootGetSchema = {
  querystring: {
    type: 'object',
    properties: {
      id: { type: 'number', nullable: true },
    },
  },
};

export interface rootGetType {
  Querystring: {
    id?: number;
  };
}

export const rootPostSchema = {
  querystring: {
    type: 'object',
    required: ['account', 'password'],
    properties: {
      account: { type: 'string' },
      password: { type: 'string' },
    },
  },
};

export interface rootPostType {
  Body: {
    account: string;
    password: string;
  };
}
export const purchasersPostSchema = {
  querystring: {
    type: 'object',
    properties: {
      id: { type: 'number', nullable: true },
    },
  },
};

export interface purchasersGet {
  Querystring: {
    id?: number;
  };
}
