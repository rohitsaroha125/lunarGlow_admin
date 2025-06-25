export const paths = {
  home: '/',
  auth: { signIn: '/auth/sign-in', signUp: '/auth/sign-up', resetPassword: '/auth/reset-password' },
  dashboard: {
    overview: '/dashboard',
    account: '/dashboard/account',
    users: '/dashboard/users',
    assessments: '/dashboard/assessments',
    skinConcerns: '/dashboard/skin-concerns',
    skinType: '/dashboard/skin-type',
    productLines: '/dashboard/product-lines',
    productGlobal: '/dashboard/product-global',
    productIndia: '/dashboard/product-india',
    skinAnalysis: '/dashboard/skin-analysis',
  },
  errors: { notFound: '/errors/not-found' },
} as const;
