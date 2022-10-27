function isAdmin(email) {
      let admins = process.env.ADMIN.split(',').map(item=> item.toLowerCase())
      return admins.includes(email.toLowerCase())
}


export function createClaim(metadata) {
        if (isAdmin(metadata.email)) {
             return  {
                  'x-hasura-allowed-roles': ['manager'],
                  'x-hasura-default-role': 'manager',
                  'x-hasura-user-id': metadata.issuer,
                }
        }

        return  {
            'x-hasura-allowed-roles': ['user'],
            'x-hasura-default-role': 'user',
            'x-hasura-user-id': metadata.issuer,
        }
}
