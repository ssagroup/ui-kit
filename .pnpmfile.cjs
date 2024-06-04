function readPackage(pkg, context) {
    // Override the manifest of foo@1.x after downloading it from the registry
    if (pkg.name === '@microsoft/api-extractor' && pkg.version.startsWith('7.')) {
      // Replace bar@x.x.x with bar@2.0.0
      pkg.dependencies = {
        ...pkg.dependencies,
        ['@microsoft/api-extractor']: '^7.47.0'
      }
      context.log('@microsoft/api-extractor@7.43.0 => @microsoft/api-extractor@^7.47.0 in dependencies')
    }
    
    // This will change any packages using baz@x.x.x to use baz@1.2.3
    if (pkg.dependencies.baz) {
      pkg.dependencies['@microsoft/api-extractor'] = '^7.47.0';
    }
    
    return pkg
  }
  
  module.exports = {
    hooks: {
      readPackage
    }
  }