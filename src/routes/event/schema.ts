export const rootGetSchema = {
  querystring: {
    type: 'object',
    properties: {
      index: { type: 'number', nullable: true },
      size: { type: 'number', nullable: true },
    },
  },
};

export interface rootGetType {
  Querystring: {
    index?: number;
    size?: number;
  };
}
