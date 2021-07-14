package com.aromeo; // make sure this is your package name
import android.view.Window;
import android.content.Intent;
import android.os.Bundle;
import android.view.WindowManager; 
// import android.support.v7.app.AppCompatActivity;
import androidx.appcompat.app.AppCompatActivity;
public class SplashActivity extends AppCompatActivity {
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        // requestWindowFeature(Window.FEATURE_NO_TITLE);
        //     getWindow().setFlags(WindowManager.LayoutParams.FLAG_FULLSCREEN,
        //     WindowManager.LayoutParams.FLAG_FULLSCREEN);
        Intent intent = new Intent(this, MainActivity.class);
        //   Bundle extras = getIntent().getExtras();
        //   intent.putExtras(this.getIntent());
        // if (extras != null) {
        //     intent.putExtras(extras);
        // }


        //   Intent intent = new Intent(this, MainActivity.class);

        // NOTE: This is necessary to forward the original intent on to the main activity.
        // This makes firebase.notifications().getInitialNotification() work.
        intent.putExtras(this.getIntent());
        startActivity(intent);
        finish();
    }
}