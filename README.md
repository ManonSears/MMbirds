<h1>MMM-SmartMirror</h1>
<i>Builds off of a touchscreen interface project by <a href="https://smartbuilds.io">SmartBuilds.io</a>, created by <a href="https://github.com/EbenKouao/MMM-SmartTouch">EbenKouao</a></i>

<h2>Step 1 – Install the module</h2>
<pre>
cd ~/MagicMirror/modules
git clone https://github.com/ManonSears/MMM-SmartMirror.git
npm install
</pre>

<h2>Step 2 – Add files to the Config.js</h2>
<pre>
{
  module: 'MMM-SmartMirror', 
  position: 'bottom_center',
  config:{ 
    // None configuration options
  }
}
</pre>

<h2>Step 3 – Start Magic Mirror</h2>
<pre>
npm run start
</pre>

<h2>Module Update</h2>
<pre>
cd ~/MagicMirror/modules/MMM-SmartMirror
git pull
</pre>
<h4>If local changes were made</h4>
<pre>
git reset --hard
</pre>
