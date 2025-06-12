import React, { useMemo } from 'react';

interface PasswordStrengthMeterProps {
  password: string;
}

const PasswordStrengthMeter: React.FC<PasswordStrengthMeterProps> = ({ password }) => {
  // Calculate password strength
  const { strength, label, color } = useMemo(() => {
    if (!password) {
      return { strength: 0, label: 'Very Weak', color: 'bg-gray-200' };
    }
    
    let score = 0;
    
    // Length check
    if (password.length >= 8) score += 1;
    if (password.length >= 12) score += 1;
    
    // Character variety checks
    if (/[A-Z]/.test(password)) score += 1;
    if (/[a-z]/.test(password)) score += 1;
    if (/[0-9]/.test(password)) score += 1;
    if (/[^A-Za-z0-9]/.test(password)) score += 1;
    
    // Determine strength level (0-4)
    const normalizedStrength = Math.min(4, Math.floor(score / 1.5));
    
    const labels = ['Very Weak', 'Weak', 'Medium', 'Strong', 'Very Strong'];
    const colors = [
      'bg-red-500',
      'bg-orange-500',
      'bg-yellow-500',
      'bg-emerald-500',
      'bg-green-600'
    ];
    
    return {
      strength: normalizedStrength,
      label: labels[normalizedStrength],
      color: colors[normalizedStrength]
    };
  }, [password]);
  
  // Get width percentage based on strength (0-4)
  const strengthPercentage = ((strength + 1) / 5) * 100;
  
  return (
    <div className="mt-2 mb-1">
      <div className="h-1 w-full bg-gray-200 rounded-full overflow-hidden">
        <div 
          className={`h-full ${color} transition-all duration-300 ease-out`} 
          style={{ width: `${strengthPercentage}%` }}
        />
      </div>
      <p className={`text-xs mt-1 ${
        strength === 0 ? 'text-red-600' :
        strength === 1 ? 'text-orange-600' :
        strength === 2 ? 'text-yellow-600' :
        strength === 3 ? 'text-emerald-600' :
        'text-green-700'
      }`}>
        {label}
      </p>
    </div>
  );
};

export default PasswordStrengthMeter;