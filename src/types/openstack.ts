export interface VM {
  id: string;
  name: string;
  status: string;
  ipAddress: string;
  creationDate: string;
}

export interface CreateServerParams {
  name: string;
  imageId: string;
  flavorId: string;
  networkId: string;
}
