import React, { useState, useEffect } from 'react';
import { regions, provinces, cities, barangays } from 'select-philippines-address';

const AddressPicker = () => {
    const [regionList, setRegionList] = useState([]);
    const [provinceList, setProvinceList] = useState([]);
    const [cityList, setCityList] = useState([]);
    const [barangayList, setBarangayList] = useState([]);

    const [selectedRegion, setSelectedRegion] = useState('');
    const [selectedProvince, setSelectedProvince] = useState('');
    const [selectedCity, setSelectedCity] = useState('');
    const [selectedBarangay, setSelectedBarangay] = useState('');

    useEffect(() => {
        regions().then(setRegionList);
    }, []);

    useEffect(() => {
        if (selectedRegion) {
            provinces(selectedRegion).then(setProvinceList);
        }
    }, [selectedRegion]);

    useEffect(() => {
        if (selectedProvince) {
            cities(selectedProvince).then(setCityList);
        }
    }, [selectedProvince]);

    useEffect(() => {
        if (selectedCity) {
            barangays(selectedCity).then(setBarangayList);
        }
    }, [selectedCity]);

    return (
        <div>
            <select onChange={(e) => setSelectedRegion(e.target.value)} value={selectedRegion}>
                <option value="">Select Region</option>
                {regionList.map((region) => (
                    <option key={region.region_code} value={region.region_code}>
                        {region.region_name}
                    </option>
                ))}
            </select>

            <select onChange={(e) => setSelectedProvince(e.target.value)} value={selectedProvince}>
                <option value="">Select Province</option>
                {provinceList.map((province) => (
                    <option key={province.province_code} value={province.province_code}>
                        {province.province_name}
                    </option>
                ))}
            </select>

            <select onChange={(e) => setSelectedCity(e.target.value)} value={selectedCity}>
                <option value="">Select City</option>
                {cityList.map((city) => (
                    <option key={city.city_code} value={city.city_code}>
                        {city.city_name}
                    </option>
                ))}
            </select>

            <select onChange={(e) => setSelectedBarangay(e.target.value)} value={selectedBarangay}>
                <option value="">Select Barangay</option>
                {barangayList.map((barangay) => (
                    <option key={barangay.barangay_code} value={barangay.barangay_code}>
                        {barangay.barangay_name}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default AddressPicker;
