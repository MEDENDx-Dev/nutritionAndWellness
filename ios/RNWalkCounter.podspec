Pod::Spec.new do |s|
  s.name = 'RNWalkCounter'
  s.version = '2.0.4'
  s.summary = 'iOS step counter for react-native-accurate-step-counter'
  s.homepage = 'https://github.com/Shikhar15606/react-native-accurate-step-counter'
  s.author = { 'react-native-accurate-step-counter' => 'opensource@example.com' }
  s.license = { type: 'MIT' }
  s.platform = :ios, '12.0'
  s.source = { path: '.' }
  s.source_files = '../node_modules/react-native-accurate-step-counter/ios/*.{h,m}'
  s.requires_arc = true
  s.dependency 'React-Core'
end