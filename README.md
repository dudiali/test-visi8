## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
   ios: npm run ios
   android: npm run android
   ```

3. note

   to fix the following problem:

   ```diff
      Warning: A props object containing a "key" prop is being spread into JSX:
      let props = {key: someKey, indicator: ..., style: ..., source: ...};
      <FitImage {...props} />
      React keys must be passed directly to JSX without using spread:
      let props = {indicator: ..., style: ..., source: ...};
      <FitImage key={someKey} {...props} />
   ```

   Here is the diff that solved the problem:

   ```dif
   diff --git a/node_modules/react-native-markdown-display/src/lib/renderRules.js

   const imageProps = {
   indicator: true,

   - key: node.key,
     style: styles.\_VIEW_SAFE_image,
     source: {
     uri: show === true ? src : `${defaultImageHandler}${src}`,
     },
     };

   if (alt) {
   imageProps.accessible = true;
   imageProps.accessibilityLabel = alt;
   }

   - return <FitImage {...imageProps} />;

   * return <FitImage key={node.key} {...imageProps} />;
   ```
