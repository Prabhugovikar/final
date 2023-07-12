// package com.hiddenly;


// import com.facebook.react.ReactActivity;
// import com.facebook.react.ReactActivityDelegate;
// import com.facebook.react.ReactRootView;
// import android.view.WindowManager;
// import android.os.Bundle;
// import android.widget.Toast;

// public class MainActivity extends ReactActivity {

//   /**
//    * Returns the name of the main component registered from JavaScript. This is used to schedule
//    * rendering of the component.
//    */
//   @Override
//   protected String getMainComponentName() {
//     return "Hiddenly";
//   }

//   @Override
// protected void onCreate(Bundle savedInstanceState) {
//   super.onCreate(savedInstanceState);
//   getWindow().setFlags(
//     WindowManager.LayoutParams.FLAG_SECURE,
//     WindowManager.LayoutParams.FLAG_SECURE
//   );
// }
// // @Override
// //     // 
// //     protected void onCreate(Bundle savedInstanceState) {
// //     super.onCreate(savedInstanceState);
// //     getWindow().setFlags(
// //         WindowManager.LayoutParams.FLAG_SECURE,
// //         WindowManager.LayoutParams.FLAG_SECURE
// //     );

// //     // Display a toast with the message "Screenshot is disabled"
// //     Toast.makeText(this, "Screenshot is disabled by Hiddenly", Toast.LENGTH_SHORT).show();
// // }




//   /**
//    * Returns the instance of the {@link ReactActivityDelegate}. There the RootView is created and
//    * you can specify the rendered you wish to use (Fabric or the older renderer).
//    */
//   @Override
//   protected ReactActivityDelegate createReactActivityDelegate() {
//     return new MainActivityDelegate(this, getMainComponentName());
//   }

//   public static class MainActivityDelegate extends ReactActivityDelegate {
//     public MainActivityDelegate(ReactActivity activity, String mainComponentName) {
//       super(activity, mainComponentName);
//     }

//     @Override
//     protected ReactRootView createRootView() {
//       ReactRootView reactRootView = new ReactRootView(getContext());
//       // If you opted-in for the New Architecture, we enable the Fabric Renderer.
//       reactRootView.setIsFabric(BuildConfig.IS_NEW_ARCHITECTURE_ENABLED);
//       return reactRootView;
//     }
//   }
// }
package com.hiddenly;

import com.facebook.react.ReactActivity;
import com.facebook.react.ReactActivityDelegate;
import com.facebook.react.ReactRootView;
import android.view.WindowManager;
import android.os.Bundle;
import android.content.Context;
import android.database.ContentObserver;
import android.os.Handler;
import android.provider.MediaStore;
import android.widget.Toast;

public class MainActivity extends ReactActivity {

  /**
   * Returns the name of the main component registered from JavaScript. This is used to schedule
   * rendering of the component.
   */
  @Override
  protected String getMainComponentName() {
    return "Hiddenly";
  }

  @Override
  protected void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);
    getWindow().setFlags(
      WindowManager.LayoutParams.FLAG_SECURE,
      WindowManager.LayoutParams.FLAG_SECURE
    );

    // Register the ScreenshotObserver
    ScreenshotObserver screenshotObserver = new ScreenshotObserver(this);
    getContentResolver().registerContentObserver(MediaStore.Images.Media.EXTERNAL_CONTENT_URI, true, screenshotObserver);
    getContentResolver().registerContentObserver(MediaStore.Video.Media.EXTERNAL_CONTENT_URI, true, screenshotObserver);
  }

  /**
   * Returns the instance of the {@link ReactActivityDelegate}. There the RootView is created and
   * you can specify the renderer you wish to use (Fabric or the older renderer).
   */
  @Override
  protected ReactActivityDelegate createReactActivityDelegate() {
    return new MainActivityDelegate(this, getMainComponentName());
  }

  public static class MainActivityDelegate extends ReactActivityDelegate {
    public MainActivityDelegate(ReactActivity activity, String mainComponentName) {
      super(activity, mainComponentName);
    }

    @Override
    protected ReactRootView createRootView() {
      ReactRootView reactRootView = new ReactRootView(getContext());
      // If you opted-in for the New Architecture, we enable the Fabric Renderer.
      reactRootView.setIsFabric(BuildConfig.IS_NEW_ARCHITECTURE_ENABLED);
      return reactRootView;
    }
  }

  private class ScreenshotObserver extends ContentObserver {
    private Context context;

    public ScreenshotObserver(Context context) {
      super(new Handler());
      this.context = context;
    }

    @Override
    public void onChange(boolean selfChange) {
      super.onChange(selfChange);

      // Display a toast message when a screenshot is detected
      Toast.makeText(context, "Screenshots and screen recording is disabled in Hiddenly", Toast.LENGTH_SHORT).show();
    }
  }
}

